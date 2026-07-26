import { SUPABASE_BUCKET_ID, supabaseClient } from '../../supabase-client';

const storageApi = {
  async deleteFile(paths: string[]) {
    const { error } = await supabaseClient.storage
      .from(SUPABASE_BUCKET_ID)
      .remove(paths);
    if (error) throw error;
  },

  getPublicUrl(path: string) {
    const { data } = supabaseClient.storage
      .from(SUPABASE_BUCKET_ID)
      .getPublicUrl(path);
    return data.publicUrl;
  },

  async getFileList(path: string) {
    const { data, error } = await supabaseClient.storage
      .from(SUPABASE_BUCKET_ID)
      .list(path);

    if (error) throw error;
    return data;
  },

  async uploadFile({
    path,
    file,
    contentType,
  }: {
    path: string;
    file: File;
    contentType?: string;
  }) {
    const { data, error } = await supabaseClient.storage
      .from(SUPABASE_BUCKET_ID)
      .upload(path, file, { upsert: true, contentType });
    if (error) throw error;
    return data;
  },
};

export { storageApi };
