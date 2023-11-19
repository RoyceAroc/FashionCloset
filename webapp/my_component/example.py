import streamlit as st
from my_component import my_component
from PIL import Image
from io import BytesIO
import base64
import os
import re

if "captured_images" not in st.session_state:
    st.session_state.captured_images = []

image_data = my_component(key="my_component_key")

if image_data:
    try:
        base64_data = re.sub('^data:image/.+;base64,', '', image_data.get('imageData').get('imageSrc'))
        binary_data = base64.b64decode(base64_data)
        image = Image.open(BytesIO(binary_data))
        dir = f"output/{image_data.get('imageData').get('instanceId')}/images"
        os.makedirs(dir, exist_ok=True)
        image_path = f"{dir}/image{len(os.listdir(dir)) + 1}.jpg"
        # image.save(image_path)

        # TBD - Store quaternion + latitude/longitude info in poses.txt
        st.success(f"Image saved as {image_path}")

    except Exception as e:
        st.error(f"Error processing image: {e}")


# Additional styling to hide Streamlit elements
hide_streamlit_style = """
    <style>
    #MainMenu {visibility: hidden;}
    #st-emotion-cache-cio0dv {visibility: hidden;}
    .st-emotion-cache-1avcm0n {visibility: hidden;}
    footer {visibility: hidden;}
    </style>
    """
st.markdown(hide_streamlit_style, unsafe_allow_html=True)
st.markdown(
    """
    <style>
    .st-ej { height: 3000px; }
    </style>
    """,
    unsafe_allow_html=True
)
