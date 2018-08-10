

```
pip3 install -r requirements.txt
cp config.py.example config.py
# edit config.py changing username, password and maybe connection string
ln -s build/static
./server.py
firefox http://localhost:5000/
```