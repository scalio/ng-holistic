#https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website
#https://stackoverflow.com/questions/51149262/enable-azure-storagev2-static-website-preview-feature-using-arm-template

param([string] $groupName,
      [string] $location = "northeurope")

$groupExists = az group exists -n $groupName

if ($groupExists -eq $true) {
    return $groupName + '7app'
}

az group create --name $groupName --location $location
$deploy = az group deployment create --resource-group $groupName --template-file 'hlc-azure-deploy-arm.json'

$deployJson = $deploy | out-string | ConvertFrom-Json

$storageAccountName = $deployJson.properties.outputs.storageAccountName.value

az storage blob service-properties update --account-name $storageAccountName --static-website --index-document 'index.html'

return $storageAccountName