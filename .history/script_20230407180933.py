import os
from PIL import Image

folder_path = '/Users/pawelpiwowarski/vangoghnft/uncompressed_images/images'

# loop through all files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith('.png'):
        # open the image file
        img = Image.open(folder_path + filename)
        img = img.resize((512, 512))
        # compress the image with level 9
        img.save(folder_path + filename, optimize=True,
                 compress_level=9
                 )

        # close the image file
        img.close()
