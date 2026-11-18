-- Rode no SQL Editor do Supabase ANTES de usar as mensagens.
-- Faz as mensagens ficarem privadas: só quem enviou e quem recebeu consegue ler.
drop policy "ler" on public.docs;
create policy "ler" on public.docs for select to authenticated
using (col <> 'messages' or owner = auth.uid() or data->>'to' = auth.uid()::text);
