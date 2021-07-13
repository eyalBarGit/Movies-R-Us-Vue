<template>
  <div class="my-modal">
    <modal v-if="showModal" name="my-modal">
    <form class="margin-center flex">
      <div class="modal-main-content">
        <div class="modal-top-section flex align-center">
          <label for="title">Title</label>
          <input
            ref="title"
            autocomplete="off"
            value="title"
            type="text"
            placeholder="Title"
            v-model="note.noteTitle"
          />
        </div>
        <div class="modal-note-section flex align-center">
          <label for="note">Note</label>
          <textarea
            value="note"
            cols="80"
            rows="5"
            v-model="note.noteText"
          ></textarea>
        </div>
        <div class="btns flex space-between align-center">
          <button @click.prevent="onSubmit" type="submit">Submit</button>
          <button @click.prevent="onCloseModal">Cancel</button>
        </div>
      </div>
    </form>
    </modal>
  </div>
</template>

<script>
export default {
  name: "ModalComp",
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      note: {
        noteTitle: "",
        noteText: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (!this.note.noteTitle || !this.note.noteTitle) return;
      this.$emit("sendNote", this.note);
      this.onCloseModal();
    },
    onCloseModal() {
      this.note = {};
      this.isOpen = false;
      this.$modal.hide("my-modal");
    },
  },
};
</script>

<style lang="scss" >
.vm--modal {
  border: 2px solid #fff;
  border-radius: 28px;
}
.my-modal {
  form {
    background-color: black;
    border-radius: 25px;
    padding: 20px;
    width: 100%;
    height: 100%;
    color: #fff;
    .modal-main-content,
    .modal-note-section {
      label {
        width: 50px;
      }
    }
    .modal-main-content {
      .modal-top-section {
        input {
          width: 92%;
        }
        margin-bottom: 10px;
      }
    }
    .btns {
      padding-top: 20px;
      padding-left: 50px;
    }
  }
}

@media (max-width: 768px) {
  .vm--modal {
    margin: 0 auto;
    left: 0 !important;
  }
}

@media (max-width: 540px) {
  .my-modal {
    form {
      input,
      textarea {
        width: 80% !important;
      }
    }
    .vm--modal {
      width: 90vw !important;
      margin: 0 auto;
      left: 0 !important;
    }
  }
}
</style>
