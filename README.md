## webauthn-demo

WebAuthn demo with biometric authentication (Face ID / fingerprint)

WebAuthn documentation:

https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/create

https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get

### Deploy

```shell script
git clone https://github.com/peterdee/webauthn-demo
cd ./webauthn-demo
nvm use 22
npm ci
```

### Launch

For local testing just launch the application:

```shell script
npm run dev
```

WebAuthn requires HTTPS, so the app will be available at https://localhost:5173

Testing on another device is possible with [Ngrok](https://ngrok.com):

```shell script
ngrok http https://localhost:5173
```

**WebAuthn forbids using IP addresses as domains, so it won't work if you access the app from your local network via IP address!**

### License

[MIT](./LICENSE.md)
