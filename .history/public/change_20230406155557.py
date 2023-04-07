import os

folder_path = "/images"
counter = 0

for filename in os.listdir(folder_path):
    if filename.endswith(".png"):
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, str(counter) + ".png")
        os.rename(old_path, new_path)
        counter += 1
