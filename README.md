# Online-Bibtext-Extraction-Tool

## Create new environment
1. Create virture environment
```
conda create -n [YOUR_ENV_NAME] python=3.7
```
2. Activate virture environment
```
conda activate [YOUR_ENV_NAME]
```
## Machine learning model
1. Install pytorch
```
conda install pytorch torchvision cpuonly -c pytorch
```
2. Install Huggingface Transformer
```
pip install transformers
```
3. Install other package
```
pip install seqeval
pip install tensorboardX
pip install --user -U nltk
```
## Server side
1. Install Flask
```
pip install Flask
pip install Flask-Cors
```
2. Install gunicorn
```
pip install gunicorn
```

## Run client side
```
cd Online-Bibtext-Extraction-Tool/client_side
npm install
npm start
```

## Run server Side
```
cd Online-Bibtext-Extraction-Tool/server_side
./run.sh
```
