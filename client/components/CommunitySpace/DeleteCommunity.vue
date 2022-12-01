<!-- Form for deleting account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteCommunityForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/community',
      method: 'DELETE',
      title: 'Delete community',
      fields: [],
      content: 'Deleting your community is permanent and irreversible. Proceed only if you understand these consequences.',
      callback: () => {
        this.$router.push({name: 'Home'}); // Goes to Home page after deleting account
        this.$store.commit('alert', {
          message: 'Your community has been deleted!', status: 'success'
        });
      }
    };
  }
};
</script>
