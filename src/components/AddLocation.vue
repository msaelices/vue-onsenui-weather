<template>
  <div>
    <v-ons-fab
      position="bottom right"
      @click="showDialog">
      <v-ons-icon icon="md-plus"></v-ons-icon>
    </v-ons-fab>
    <v-ons-alert-dialog
      :visible="dialogVisible"
      cancelable="true">
      <div class="alert-dialog-title">Add a location</div>
      <div class="alert-dialog-content">
        <v-ons-input
          underbar
          float
          placeholder="Location name"
          v-model="locationName">
        </v-ons-input>
      </div>
      <div class="alert-dialog-footer">
        <button
          click.prevent="onCancel"
          class="alert-dialog-button">
            Cancel
        </button>
        <button
          class="alert-dialog-button"
          @click.prevent="onOk">
            OK
        </button>
      </div>
    </v-ons-alert-dialog>
  </div>
</template>

<script>
export default {
  name: 'add-location',
  data () {
    return {
      dialogVisible: false,
      locationName: '',
    }
  },
  methods: {
    showDialog () {
      this.dialogVisible = true;
    },
    hideDialog () {
      this.dialogVisible = false;
    },
    onOk () {
      if (this.locationName) {
        this.$store.dispatch('forecast/addlocation', this.locationName);
        this.locationName = '';
      }
      this.hideDialog();
    },
    onCancel () {
      this.hideDialog();
    },
  }
}
</script>

<style scoped>

</style>
