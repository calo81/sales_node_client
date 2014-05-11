sales_node_client
=================


After run visit with `nodejs server.js`:
```
http://localhost:3001/index.html
```

then you can visit from other tab, browser:

```
http://localhost:3001/sale/john/456
```

where the last 2 parts uf the URL are dynamic to create a new sell.

It also has a POST url like:

```
http://localhost:3001/sale
```

which can receive a json body like:

```
{"id":16,"person":"carlo","amount":245.0}
```

The remote one to test is at:

```
http://178.79.182.165:3001/index.html
```
