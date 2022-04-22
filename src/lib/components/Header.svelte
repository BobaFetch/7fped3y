<script>
  import { Icon } from '@steeze-ui/svelte-icon'
  // import {  } from '@steeze-ui/heroicons'
  import { Columns, Edit, Settings } from '@steeze-ui/feather-icons'
  import smallLogo from '$lib/assets/smallLogo.svg'

</script>

<div class="flex items-center h-12 p-2 mb-1">
  <!-- LOGO -->
  <div class="flex flex-1">
    <img src={smallLogo} alt="monette logo - hand holding currency" />
    <!-- <h2 class="text-gray-200 font-header text-4xl">
      MONETTE
    </h2> -->
  </div>
  <!-- Collabs | Contacts | Settings/Profile -->
  <div class="flex items-center">
    <a href="/collabs" title="Collabs" class="h-10 w-10 mx-3">
      <Icon src={Edit} theme="outline" size="100%" class="text-gray-400 hover:text-gray-200 stroke-1" />
    </a>
    <a href="/contacts" title="Contacts" class="h-10 w-10 mx-3">
      <Icon src={Columns} theme="outline" size="100%" class="text-gray-400 hover:text-gray-200 stroke-1" />
    </a>
    <a href="/settings/1" title="Settings" class="h-10 w-10 mx-3">
      <Icon src={Settings} theme="outline" size="100%" class="text-gray-400 hover:text-gray-200 stroke-1" />
    </a>
  </div>
</div>