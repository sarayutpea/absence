<template>
    <div class="master">
        <v-app id="inspire">
        <!-- menu position -->
        <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
            <v-list dense>
                <template v-for="item in items">
                    <v-list-group v-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile v-for="(child, i) in item.children" :key="i" @click="" >
                            <v-list-tile-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                {{ child.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                    <v-list-tile v-else :key="item.text" @click="">
                        <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-navigation-drawer>
        <!-- end menu position -->

        <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Absence</span>
            </v-toolbar-title>
                <v-btn icon >
                    <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
                <breadcrumbs />
            <v-spacer>

            </v-spacer>
                    
            <v-btn icon large>
                <v-avatar size="32px" tile>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Wikimedia_Community_Logo-Cabal-blank.png" alt="Absence">
                </v-avatar>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-width>
                Content position

                {{ breadcrumbs }}
                <Login />
            </v-container>
        </v-content>
    </v-app>


    </div>
</template>
<script>
import Login from "../../components/auth/Login.vue";
import Breadcrumbs from '../../components/layouts/Breadcrumbs.vue';

export default {
  name: "Master",
  components: {
    Login,
    Breadcrumbs
  },
  data: ()=>({
    dialog: false,
    drawer: null,
    items: [
      { icon: "computer", text: "Dashboard", link: "#" },
      { icon: "history", text: "Salary", link: "#" },
    //   { icon: "content_copy", text: "Duplicates" },
    //   {
    //     icon: "keyboard_arrow_up",
    //     "icon-alt": "keyboard_arrow_down",
    //     text: "Labels",
    //     model: true,
    //     children: [{ icon: "add", text: "Create label" }]
    //   },
      {
        icon: "keyboard_arrow_up", 
        'icon-alt' : "keyboard_arrow_down",
        text: "More",
        model: false,
        children: [
          { text: "Logout" },
        ]
      }
    //   { icon: "settings", text: "Settings" },
    //   { icon: "chat_bubble", text: "Send feedback" },
    //   { icon: "help", text: "Help" },
    //   { icon: "phonelink", text: "App downloads" },
    //   { icon: "keyboard", text: "Go to the old version" }
    ],
    breadcrumbs: Breadcrumbs.items
  }),
  props: {
    source: String
  }
};
</script>
<style scope>
</style>


