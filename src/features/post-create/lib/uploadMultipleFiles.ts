import { postApi } from '~/entities/post';
import type { IFileItem } from '~/shared/ui';

const uploadMultipleFiles = async ({
  path,
  files,
}: {
  path: string;
  files: Array<IFileItem>;
}) => {
  const imgUrls = await Promise.all(
    files.map((file) => {
      return postApi.uploadFile({ path: `${path}/${file.name}`, file });
    })
  );

  return imgUrls;
};

export { uploadMultipleFiles };
