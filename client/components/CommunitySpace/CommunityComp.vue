<template>
  <main>
    <section>
      <header>
        <h2>
          Welcome to @{{community.spacename}} ! </h2>
      </header>
    </section>
    <section>
      <header>
        <h2>View the Freets in this Community</h2>
      </header> 
    </section>
    <section
        v-if="$store.state.freets.length"
      >
        <FreetComponent
          v-for="freet in $store.state.freets"
          :key="freet.id"
          :freet="freet"
        />
      </section>
      <article
        v-else
      >
        <h3>No freets found.</h3>
      </article>
    <button @click="addFreet">
        🗣 Freet to Community
        </button>
  </main>
</template>

<script>
export default {
  name: 'CommunityComp',
  props: {
    // Data from the stored freet
    community: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      //draft: this.freet.content, // Potentially-new content for this freet
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    async addFreet() {
      const options = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({commId: this.commId, freetId: freetId})
      }

      const r = await fetch("/api/community", options);
    }
  }
};
</script>