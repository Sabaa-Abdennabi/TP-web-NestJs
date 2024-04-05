// multer.config.ts

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Function to edit the file name
export const editFileName = (req, file, callback) => {
    const randomName = uuidv4() + file.originalname;
    callback(null, randomName);
  };
  
  // Function to filter image files
  export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  export const multerConfig = {
    storage: diskStorage({
      destination: './public/uploads',
      filename: editFileName, // Use the editFileName function to generate file names
    }),
    fileFilter: imageFileFilter, // Apply the imageFileFilter function to filter files
  };
