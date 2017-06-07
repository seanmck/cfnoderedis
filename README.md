# Node.js + Azure Redis Cache with the Azure Service Broker

This simple application demonstrates how to integrate an Azure service (in this case Azure Redis Cache) with a Node.js application via the Azure Service Broker.

## Prerequisites

- [A Cloud Foundry environment in Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/cloudfoundry-get-started)
- [The Azure Meta Service Broker](https://github.com/Azure/meta-azure-service-broker)
- An Azure Resource Group in which to deploy your services

## Set service parameters

Open `config.json` and set the following parameters:

- Azure Resource Group name
- Cache name (the name of the cache as it will appear in Azure)
- Location (the Azure region where the cache should be created)

## Create the service

From the CF CLI, run:

```bash
cf create-service azure-rediscache <plan> <servicename>
```

Where plan is one of basic, standard, premium and servicename is the name of the service to be created in Cloud Foundry, and thus the name that your app will bind to.

## Bind the application

Once the service is finished provisioning, you can bind the application to it. Open `manifest.yml` and update the *services* property to reference the service name you created. Then deploy the application with `cf push`.

## Run the application

The app provides a simple UI with two text boxes where you can store key-value pairs. The pairs will be stored in the Azure Redis Cache.

To pull the values back out, navigate to:

http://app-url/values?name=your-key-name