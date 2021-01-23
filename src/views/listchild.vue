<template>
  <div>{{ index }} - {{ source.text }} - {{ otherPropValue }}</div>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    index: { // index of current item
      type: Number
    },
    source: { // here is: {uid: 'unique_1', text: 'abc'}
      type: Object,
      default () {
        return {}
      }
    },
    otherPropValue: String // here is: 'The Progressive JavaScript Framework'
  }
}
</script>
