#https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website
#https://stackoverflow.com/questions/51149262/enable-azure-storagev2-static-website-preview-feature-using-arm-template

param([string] $groupName,
      [string] $location = "northeurope")

az group create --name $groupName --location $location
$deploy = az group deployment create --resource-group $groupName --template-file 'hlc-azure-deploy-arm.json'

$deploy

# $storageAccountName = $deploy.properties.outputs.storageAccountName

# $storageAccountName = (Get-AzureRmResourceGroupDeployment -ResourceGroupName $groupName -Name $groupName).Outputs.storageAccountName.value

# az storage blob service-properties update --account-name $storageAccountName --static-website --index-document 'index.html'
