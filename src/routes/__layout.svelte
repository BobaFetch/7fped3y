<script context="module">
  export async function load({url, session}) {
    if (url.pathname != '/auth' && !session.authenticated) {
      
      return {
        status: 302,
        redirect: '/auth'
      }

    }

    if (url.pathname != '/auth' && session.authenticated) {
      return {
        props: {
          user: true
        }
      }
    }
    
    return { props: {
      user: false
    } }
  }

</script>

<script>
  import '../app.css'
  import Header from '$lib/components/Header.svelte';
  export let user
</script>

<div class="container-full h-screen bg-slate-900 flex flex-col overflow-hidden">
  {#if user}
    <div class="">
      <Header />
    </div>
  {/if}
  <div class="overflow-auto font-body">
    <slot />
  </div>
</div>
