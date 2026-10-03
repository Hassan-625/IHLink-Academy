create or replace function public.submit_academy_assignment(
  p_assignment_id uuid,
  p_submission_text text default null,
  p_submission_url text default null
) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user uuid := auth.uid();
  v_assignment public.academy_assignments;
  v_enrollment public.academy_enrollments;
  v_id uuid;
begin
  if v_user is null then raise exception 'Authentication required'; end if;
  select * into v_assignment from public.academy_assignments where id=p_assignment_id for share;
  if v_assignment.id is null or not v_assignment.is_published then raise exception 'Published assignment not found'; end if;
  if v_assignment.due_at is not null and now()>v_assignment.due_at then raise exception 'Assignment deadline has passed'; end if;
  if nullif(trim(coalesce(p_submission_text,'')),'') is null and nullif(trim(coalesce(p_submission_url,'')),'') is null then raise exception 'Submission text or URL is required'; end if;
  select * into v_enrollment from public.academy_enrollments
   where user_id=v_user and course_id=v_assignment.course_id and status='active'
   order by enrolled_at desc limit 1 for share;
  if v_enrollment.id is null then raise exception 'An active course enrolment is required'; end if;
  if exists(select 1 from public.academy_assignment_submissions where assignment_id=p_assignment_id and enrollment_id=v_enrollment.id) then raise exception 'This assignment has already been submitted'; end if;
  insert into public.academy_assignment_submissions(assignment_id,enrollment_id,submission_url,submission_text,status)
  values(p_assignment_id,v_enrollment.id,nullif(trim(coalesce(p_submission_url,'')),''),nullif(trim(coalesce(p_submission_text,'')),''),'submitted')
  returning id into v_id;
  return v_id;
end
$$;
revoke all on function public.submit_academy_assignment(uuid,text,text) from public, anon;
grant execute on function public.submit_academy_assignment(uuid,text,text) to authenticated, service_role;
drop policy if exists "academy learners create own submissions" on public.academy_assignment_submissions;
