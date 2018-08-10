
Under-development app for accepting FreeGenes submissions. Back-end is Flash (Python) in order to interface with FreeGenes codebase. Front-end is React.

This app is probably not very relevant to anyone outside of the BioBricks Foundation except as users.

```
pip3 install -r requirements.txt
cp config.py.example config.py
# edit config.py changing username, password and maybe connection string
npm install
npm run build
ln -s build/static
./server.py
firefox http://localhost:5000/
```