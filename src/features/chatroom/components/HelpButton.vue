<template>
  <q-btn class="help-button shadow-12 q-py-sm" no-caps unelevated rounded color="orange-400">
    <q-icon name="fa-solid fa-wand-magic-sparkles" class="help-button-icon q-mr-sm" />
    <span class="help-button-label font-sm text-weight-medium">Ask Nitra AI</span>
  </q-btn>
</template>

<style scoped lang="scss">
.help-button-icon {
  font-size: 12px;
}

@media (max-width: $breakpoint-md-max) {
  .help-button {
    padding: 16px;
  }

  .help-button-icon {
    margin-right: 0;
    font-size: 16px;
  }

  .help-button-label {
    display: none;
  }
}
</style>
