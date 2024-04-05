import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Function to edit the file name
export const editFileName = (req, file, callback) => {
  const randomName = uuidv4() + file.originalname;
  callback(null, randomName);
};

// Function to filter image files by file type
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

// Function to filter files by file size
export const fileSizeFilter = (req, file, callback) => {
  // Set the maximum file size (in bytes)
  const maxSize =  1000000; // 1 MB
  if (file.size > maxSize) {
    return callback(new Error('File size exceeds the limit (10MB)!'), false);
  }
  callback(null, true);
};

export const multerConfig = {
    storage: diskStorage({
      destination: './public/uploads',
      filename: editFileName,
    }),
    fileFilter: (req, file, callback) => {
      // Check file type
      imageFileFilter(req, file, (fileTypeErr, fileTypeValid) => {
        if (fileTypeErr) {
          return callback(fileTypeErr, false);
        }
        if (!fileTypeValid) {
          return callback(new Error('Only image files are allowed!'), false);
        }
  
        // Check file size
        fileSizeFilter(req, file, (fileSizeErr, fileSizeValid) => {
          if (fileSizeErr) {
            return callback(fileSizeErr, false);
          }
          if (!fileSizeValid) {
            return callback(new Error('File size exceeds the limit (1MB)!'), false);
          }
  
          // Both filters passed, accept the file
          callback(null, true);
        });
      });
    },
  };
  