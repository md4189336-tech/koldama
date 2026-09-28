import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Establishment = Tables<'establishments'>;
type Status = Establishment['status'];

const TABS: { value: Status; label: string }[] = [
  { value: 'pending_approval', label: 'En attente' },
  { value: 'approved', label: 'Approuvés' },
  { value: 'rejected', label: 'Refusés' },
];

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [items, setItems] = useState<Establishment[]>([]);
  const [tab, setTab] = useState<Status>('pending_approval');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const loadAll = useCallback(async () => {
    const { data, error } = await supabase
      .from('establishments')
      .select('*')
      .order('created_at', { ascending: false });
    setItems(data ?? []);
    if (error) setNotice('Impossible de charger les établissements.');
  }, []);

  const verifyAdmin = useCallback(async (id: string) => {
    setUserId(id);
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', id)
      .eq('role', 'admin')
      .maybeSingle();
    const allowed = !error && Boolean(data);
    setIsAdmin(allowed);
    if (allowed) await loadAll();
    else setNotice('Ce compte ne possède pas le rôle administrateur.');
    setChecking(false);
  }, [loadAll]);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) void verifyAdmin(data.session.user.id);
      else if (active) setChecking(false);
    });
    return () => { active = false; };
  }, [verifyAdmin]);

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChecking(true);
    setNotice('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setNotice('Connexion refusée. Vérifiez vos identifiants.');
      setChecking(false);
      return;
    }
    await verifyAdmin(data.user.id);
  };

  const moderate = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase.from('establishments').update({ status }).eq('id', id);
    if (error) {
      setNotice('La modification a échoué. Vérifiez les droits administrateur.');
      return;
    }
    setItems(list => list.map(item => (item.id === id ? { ...item, status } : item)));
    setNotice(status === 'approved' ? 'Établissement approuvé.' : 'Établissement rejeté.');
  };

  const createTest = async () => {
    setBusy(true);
    const stamp = new Date().toLocaleString('fr-FR');
    const { error } = await supabase.from('establishments').insert({
      name: `Auberge Test (${stamp})`,
      type: 'Auberge',
      description: 'Demande de test générée depuis l’espace admin pour vérifier le flux de modération.',
      amenities: ['Wi-Fi', 'Climatisation'],
      phone: '+221 78 208 96 04',
      whatsapp: '+221 78 208 96 04',
      address: 'Centre-ville, Kolda',
      latitude: 12.8939,
      longitude: -14.9412,
      status: 'pending_approval',
    });
    setBusy(false);
    if (error) {
      setNotice('Impossible de créer la demande de test.');
      return;
    }
    setTab('pending_approval');
    setNotice('Demande de test créée.');
    await loadAll();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setIsAdmin(false);
    setItems([]);
  };

  const visible = items.filter(item => item.status === tab);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-xs font-semibold uppercase text-accent">Kolda Heritage</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">Modération des établissements</h1>
        </div>
        {isAdmin && (
          <div className="flex flex-wrap gap-2">
            <button onClick={() => void createTest()} disabled={busy} className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-60">
              {busy ? 'Création…' : 'Créer une demande de test'}
            </button>
            <button onClick={signOut} className="rounded-md border border-border px-3 py-2 text-sm">Se déconnecter</button>
          </div>
        )}
      </div>

      {checking ? <p className="py-8 text-muted-foreground">Vérification de l’accès…</p> : !isAdmin ? (
        <form onSubmit={signIn} className="mt-8 max-w-md space-y-4">
          <label className="block space-y-1 text-sm font-medium">Adresse e-mail
            <input required type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} className="w-full rounded-md border border-border bg-background p-2" />
          </label>
          <label className="block space-y-1 text-sm font-medium">Mot de passe
            <input required type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="w-full rounded-md border border-border bg-background p-2" />
          </label>
          <button className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground">Se connecter</button>
        </form>
      ) : (
        <section className="mt-6">
          <div role="tablist" className="mb-5 flex flex-wrap gap-2 border-b border-border">
            {TABS.map(t => {
              const count = items.filter(i => i.status === t.value).length;
              const active = tab === t.value;
              return (
                <button
                  key={t.value}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.value)}
                  className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold ${active ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  {t.label} ({count})
                </button>
              );
            })}
          </div>
          {visible.length === 0 ? <p className="py-8 text-muted-foreground">Aucun établissement dans cette catégorie.</p> : (
            <ul className="divide-y divide-border">
              {visible.map(item => (
                <li key={item.id} className="grid gap-4 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase text-accent">{item.type}</p>
                    <h3 className="mt-1 font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-2 break-words text-xs text-muted-foreground">{item.address} · {item.phone} · {item.whatsapp}</p>
                  </div>
                  <div className="flex gap-2">
                    <button disabled={item.status === 'approved'} onClick={() => void moderate(item.id, 'approved')} className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">Approuver</button>
                    <button disabled={item.status === 'rejected'} onClick={() => void moderate(item.id, 'rejected')} className="rounded-md border border-destructive px-3 py-2 text-sm font-semibold text-destructive disabled:opacity-40">Rejeter</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      {notice && <p role="status" className="mt-5 text-sm text-muted-foreground">{notice}</p>}
      {userId && !isAdmin && !checking && <button onClick={signOut} className="mt-4 text-sm underline">Fermer la session</button>}
    </div>
  );
};

export default Admin;
