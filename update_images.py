import os
import json
import re

# 获取images目录下的所有图片文件
def get_image_files():
    image_dir = "images"
    images = []
    for filename in os.listdir(image_dir):
        if filename.lower().endswith((".jpg", ".jpeg", ".png", ".gif")):
            # 从文件名中提取信息
            pattern = r'Category\s+([^,]+),\s*Name\s+([^,]+),\s*Size\s+([^,]+),\s*Description\s*(.+?)\.(jpg|jpeg|png|gif)$'
            match = re.search(pattern, filename, re.I)
            
            if match:
                category = match.group(1).strip()
                name = match.group(2).strip()
                size = match.group(3).strip()
                description = match.group(4).strip()
                
                images.append({
                    "path": os.path.join(image_dir, filename).replace("\\", "/"),
                    "name": name,
                    "category": category,
                    "size": size,
                    "description": description
                })
    return images

# 更新images.json文件
def update_images_json():
    images = get_image_files()
    data = {"images": images}
    
    with open("images.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("images.json has been updated successfully!")

if __name__ == "__main__":
    update_images_json()