import { supabase } from '$lib/supabase';

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error(error);
  }

  return data;
};
