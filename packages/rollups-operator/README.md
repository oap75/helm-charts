# Cartesi Rollups Operator

## Development

```shell
$ kubectl create secret generic mnemonic --from-literal=MNEMONIC="test test test test test test test test test test test junk"
$ helm install redis bitnami/redis --wait --set auth.enabled=false --set architecture=standalone --set image.tag=6.2-debian-11
redis-master.default.svc.cluster.local
$ helm install postgres oci://registry-1.docker.io/bitnamicharts/postgresql
postgres-postgresql.default.svc.cluster.local
$ export POSTGRES_PASSWORD=$(kubectl get secret --namespace default postgres-postgresql -o jsonpath="{.data.postgres-password}" | base64 -d)
```
