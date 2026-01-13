from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import torch
from PIL import Image
import io
import base64
from utils import check_ocr_box, get_yolo_model, get_caption_model_processor, get_som_labeled_img
import os
import logging
from typing import Optional

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize models
yolo_model = get_yolo_model(model_path='weights/icon_detect/best.pt')
caption_model_processor = get_caption_model_processor(model_name="florence2", model_name_or_path="weights/icon_caption_florence")

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

@app.get("/")
async def index():
    # Use absolute path to index.html in the same directory as server.py
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return FileResponse(os.path.join(current_dir, 'index.html'))

@app.post("/process")
async def process(
    image: UploadFile = File(...),
    box_threshold: float = Form(0.05),
    iou_threshold: float = Form(0.1),
    use_paddleocr: bool = Form(True),
    imgsz: int = Form(640)
):
    logger.debug(f"Processing image with parameters: box_threshold={box_threshold}, iou_threshold={iou_threshold}, use_paddleocr={use_paddleocr}, imgsz={imgsz}")

    try:
        # Read and save uploaded image
        image_save_path = 'imgs/saved_image.png'
        os.makedirs('imgs', exist_ok=True)
        
        contents = await image.read()
        image_pil = Image.open(io.BytesIO(contents))
        image_pil.save(image_save_path)
        logger.debug(f"Saved image to {image_save_path}")

        # Process image
        box_overlay_ratio = image_pil.size[0] / 3200
        draw_bbox_config = {
            'text_scale': 0.8 * box_overlay_ratio,
            'text_thickness': max(int(2 * box_overlay_ratio), 1),
            'text_padding': max(int(3 * box_overlay_ratio), 1),
            'thickness': max(int(3 * box_overlay_ratio), 1),
        }
        logger.debug(f"Draw bbox config: {draw_bbox_config}")

        logger.debug("Starting OCR box check")
        ocr_bbox_rslt, is_goal_filtered = check_ocr_box(
            image_save_path, 
            display_img=False, 
            output_bb_format='xyxy', 
            goal_filtering=None, 
            easyocr_args={'paragraph': False, 'text_threshold': 0.9}, 
            use_paddleocr=use_paddleocr
        )
        logger.debug(f"OCR box check completed. Goal filtered: {is_goal_filtered}")
        
        text, ocr_bbox = ocr_bbox_rslt
        logger.debug("Starting get_som_labeled_img processing")
        logger.debug(f"OCR text length: {len(text)}, OCR bbox count: {len(ocr_bbox)}")
        
        dino_labled_img, label_coordinates, parsed_content_list = get_som_labeled_img(
            image_save_path,
            yolo_model,
            BOX_TRESHOLD=box_threshold,
            output_coord_in_ratio=True,
            ocr_bbox=ocr_bbox,
            draw_bbox_config=draw_bbox_config,
            caption_model_processor=caption_model_processor,
            ocr_text=text,
            iou_threshold=iou_threshold,
            imgsz=imgsz
        )
        logger.debug(f"get_som_labeled_img completed. Label coordinates count: {len(label_coordinates)}, Parsed content count: {len(parsed_content_list)}")

        return {
            'image': dino_labled_img,  # Base64 encoded image
            'parsed_content': parsed_content_list,
            'label_coordinates': label_coordinates
        }

    except Exception as e:
        logger.error(f"Error processing image: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=7862)
