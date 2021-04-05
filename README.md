# douaisis-2021

Site de campagne canton de Douai 2021

## Développement

Installer NodeJS, cloner le projet puis :
```sh
npm run dev
```

Relancer un build :
```sh
curl -X POST  https://api.github.com/repos/nfroidure/douaisis-2021/dispatches -H 'Accept: application/vnd.github.v3+json' --data-binary '{"event_type":"publish-event"}' -H"Authorization: bearer [the_token]" -H"User-Agent: Contentful" -H"Content-Type: application/json" -vv
```
