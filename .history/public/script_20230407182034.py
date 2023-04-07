import os
from PIL import Image

folder_path = '/Users/pawelpiwowarski/vangoghnft/public/images_full/'

# loop through all files in the folder
for filename in os.listdir(folder_path):
    if filename.endswith('.png'):
        # open the image file
        img = Image.open(folder_path + filename)

        # resize the image to 512x512

        # save the resized image
        img.save(folder_path + filename, optimize=True, compression_level=7)

        # close the image file
        img.close()
