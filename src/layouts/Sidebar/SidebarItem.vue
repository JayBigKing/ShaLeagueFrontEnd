<template>
  <div class="menu-wrapper">
    <template v-for="item in sidebarList">
      <p class="sidebarItem-groupTitle2" v-if="item.hasOwnProperty('groupTitle')" :key="item.groupTitle">{{item.groupTitle}}</p>
      <s-submenu
        :popper-append-to-body="false"
        v-else-if="item.hasOwnProperty('group') && item.children.length" :index="item.group" :key="item.group">
        <template  slot="title">
          <s-icon v-if="item.icon" :icon="item.icon" />
          <span class="theTitleTop" v-if="item.title" slot="title">{{item.title}}</span>
        </template>

        <template v-for="child in item.children">
          <s-menu-item :index="child.path" :key="child.path">
            <s-icon v-if="child.icon" :icon="child.icon" />
            <span class="theTitleNext" v-if="child.title" slot="title">{{child.title}}</span>
          </s-menu-item>
        </template>
      </s-submenu>
      <s-menu-item v-else :index="item.path" :class="{'submenu-title-noDropdown':!isNest}" :key="item.path">
        <s-icon v-if="item.icon" :icon="item.icon" />
        <span class="theTitleNextNext" v-if="item.title" slot="title">{{item.title}}</span>
      </s-menu-item>
    </template>
  </div>
</template>

<script>
import {MenuItem, Submenu} from 'element-ui'
import Icon from '@/components/Icon'

export default {
  name: 'sidebar-item',
  props: {
    sidebarList: Array,
    isNest: {
      type: Boolean,
      default: false
    }
  },
  components: {
    's-menu-item': MenuItem,
    's-submenu': Submenu,
    's-icon': Icon
  }
}
</script>

<style>
.sidebarItem-groupTitle2{
  font-size: 18px;
  color: #f3f5f9;
}
.theTitleTop{
  font-size: 18px;
}
.theTitleNext{
  font-size: 16px;
}
.theTitleNextNext{
  font-size: 18px;
}
</style>
