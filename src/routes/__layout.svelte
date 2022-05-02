<script context="module">
  export async function load({url, session}) {
    if (url.pathname != '/auth' && !session.authenticated) {
      return {
        status: 302,
        redirect: '/auth'
      }
    }
    return { props: {} }
  }

</script>

<script>
  import '../app.css'
  import Header from '$lib/components/Header.svelte';
</script>

<div class="container-full h-screen bg-slate-900 flex flex-col overflow-hidden">
  <div class="">
    <Header />
  </div>
  <div class="overflow-auto font-body">
    <slot />
  </div>
</div>
