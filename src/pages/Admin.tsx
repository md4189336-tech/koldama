import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Establishment = Tables<'establishments'>;

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [pending, setPending] = useState<Establishment[]>([]);
  const [notice, setNotice] = useState('');

  const loadPending = useCallback(async () => {
    const { data, error } = await supabase
      .from('establishments')
      .select('*')
      .eq('status', 'pending_approval')
      .order('created_at', { ascending: true });
    setPending(data ?? []);
    if (error) setNotice('Impossible de charger les propositions en attente.');
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
    if (allowed) await loadPending();
    else setNotice('Ce compte ne possède pas le rôle administrateur.');
    setChecking(false);
  }, [loadPending]);

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
    const { error } = await supabase
      .from('establishments')
      .update({ status })
      .eq('id', id);
    if (error) {
      setNotice('La modification a échoué. Vérifiez les droits administrateur.');
      return;
    }
    setPending(items => items.filter(item => item.id !== id));
    setNotice(status === 'approved' ? 'Établissement approuvé.' : 'Établissement rejeté.');
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setIsAdmin(false);
    setPending([]);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-xs font-semibold uppercase text-accent">Kolda Heritage</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">Modération des établissements</h1>
        </div>
        {isAdmin && <button onClick={signOut} className="rounded-md border border-border px-3 py-2 text-sm">Se déconnecter</button>}
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
          <h2 className="mb-4 text-lg font-semibold">En attente ({pending.length})</h2>
          {pending.length === 0 ? <p className="py-8 text-muted-foreground">Aucune proposition à modérer.</p> : (
            <ul className="divide-y divide-border">
              {pending.map(item => (
                <li key={item.id} className="grid gap-4 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase text-accent">{item.type}</p>
                    <h3 className="mt-1 font-semibold text-foreground">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{item.address} · {item.phone} · {item.whatsapp}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => void moderate(item.id, 'approved')} className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Approuver</button>
                    <button onClick={() => void moderate(item.id, 'rejected')} className="rounded-md border border-destructive px-3 py-2 text-sm font-semibold text-destructive">Rejeter</button>
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