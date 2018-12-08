# Ng-Holistic common

## Deps
+ @clarity/...
+ @angular/cdk

### Include styles from deps in to you app

### You may add them to `styles.scss`

```
@import '~@angular/cdk/overlay-prebuilt.css';
@import '~@angular/cdk/a11y-prebuilt.css';

@import '~@clr/ui/clr-ui.min.css';
@import '~@clr/icons/clr-icons.min.css';

```

### or via angular.json

"styles": [
    ...
    "node_modules/@clr/ui/clr-ui.min.css",
    "node_modules/@clr/icons/clr-icons.min.css",
    "node_modules/@angular/cdk/overlay-prebuilt.css",
    "node_modules/@angular/cdk/a11y-prebuilt.css"
],

