drop policy if exists "academy learner reads issued certificate output" on storage.objects;
create policy "academy learner reads issued certificate output"
on storage.objects for select to authenticated
using (
  bucket_id='schoolpro-document-templates'
  and exists (
    select 1 from public.academy_certificates c
    join public.academy_enrollments e on e.id=c.enrollment_id
    where c.output_storage_path=storage.objects.name
      and c.status='issued'
      and e.user_id=auth.uid()
  )
);
