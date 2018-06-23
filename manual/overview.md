# Caldera Processors UI


## Shape Of A Processor

```
{
    ID: String,
    type: String,
    label: String
    prepareConfigFields: Array,
    configValues: Map
}
```

* ID: Alphanumeric ID for config field
    - Example: For the list ID of an email marketting processor's settings: `cf-fancyemails-list-id`
* type: String. The type of processors
    - Examples: `email` or `redirect`
* label: Optional String. A user supplied label unique to the processor.
* prepareConfigFields: Array of config fields as expected by [Caldera Components' `RenderGroup` component](https://calderalabs.org/caldera-components/manual/components.html#rendergroup)
* configValues: A map of the current field values.

## prepareConfigFields vs configValues
`prepareConfigFields` should represent what has been stored for this processor's settings. It contains the saved value and the processor configuration, since configuration is itself dynamic. For example, your options for list to subscribe to may change after the value of a separate field for entering an API key has changed.

Because the `configFieldsFactory` can add in missing values from prepareConfigFields, it makes sense to remove non-standard values from these objects before persisting them.

`configValues` is a `Map`, indexed by `configField.ID` with the current value of the field. Seperating these values out from `configValues`


## Container