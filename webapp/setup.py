from pathlib import Path

import setuptools

this_directory = Path(__file__).parent

setuptools.setup(
    name="streamlit-custom-component",
    version="0.0.1",
    author="Royce Arockiasamy",
    author_email="royceaden@gmail.com",
    description="AI ATL Project",
    url="",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=[
        "streamlit >= 0.63",
    ],
    extras_require={
        "devel": [
            "wheel",
            "pytest==7.4.0",
            "playwright==1.39.0",
            "requests==2.31.0",
            "pytest-playwright-snapshot==1.0",
            "pytest-rerunfailures==12.0",
        ]
    }
)