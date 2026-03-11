# Cloudflare Workers

A collection of Cloudflare Workers deployed via GitHub integration.

## Workers

### [domain-check](./domain-check/)
Makes automating domain status lookups easier.

### [unifi-cloudflare-ddns](./unifi-cloudflare-ddns/)
Connects with a Unifi gateway to set dynamic DNS to the correct IP.

## Deployment

Workers are automatically deployed to Cloudflare when changes are pushed to the `main` branch.

## Secrets & Environment Variables

Sensitive values such as API keys are stored as encrypted environment variables in the Cloudflare dashboard and are not committed to this repository.
