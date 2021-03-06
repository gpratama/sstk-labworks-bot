# External Folder

This folder is supposed to be used with Docker (planned). You supposed to create
two subfolders inside this folder, `credentials` and `downloads` (`downloads` 
folder will be automatically created).

The content of this folder will be as follows:
```
.
├── credentials
│   ├── lab-sstk-admin.json
│   ├── lab-sstk-web.json
│   ├── private.key
│   └── public.pem
├── downloads
├── db.sqlite3
└── README.md
```

## Purpose

| File                | Purpose                  |
|---------------------|--------------------------|
| lab-sstk-admin.json | Accessing Firestore      |
| lab-sstk-web.json   | Sending email login link |
| private.key         | Signing/Parsing JWT      |
| public.pem          | Parsing JWT              |
| db.sqlite3          | Database                 |

## Procedures

To create `db.sqlite3` go to db folder where `knexfile.js` lies. Run:
```
$ npx knex migrate:latest --env production
```

`lab-sstk-admin.json` and `lab-sstk-web.json` can be obtained by using Firebase.

`lab-sstk-admin.json` boilerplate (Firebase Admin):
```
{
  "type": "service_account",
  "project_id": "XXX",
  "private_key_id": "XXX",
  "private_key": "XXX",
  "client_email": "XXX",
  "client_id": "XXX",
  "auth_uri": "XXX",
  "token_uri": "XXX",
  "auth_provider_x509_cert_url": "XXX",
  "client_x509_cert_url": "XXX"
}
```

`lab-sstk-web.json` boilerplate (Firebase Web App)
```
{
  "apiKey": "XXX",
  "authDomain": "XXX",
  "databaseURL": "XXX",
  "projectId": "XXX",
  "storageBucket": "XXX",
  "messagingSenderId": "XXX",
  "appId": "XXX",
  "measurementId": "XXX"
}
```

On the other hand, `private.key` and `public.pem` can be generated by using
`openssl`.

`private.key`:
```
$ openssl genrsa -out private.key 2048
```

`public.pem`:
```
$ openssl rsa -in private.key -pubout -out public.pem
```

After this, create `credentials` folder inside `ROOT/firebase/functions` then
copy `lab-sstk-web.json` and `public.pem` to there.