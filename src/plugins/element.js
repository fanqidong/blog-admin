import Vue from 'vue'
import {
  Button,
  Input,
  Table,
  TimePicker,
  Tooltip,
  Form,
  FormItem,
  Dialog,
  Pagination,
  MessageBox,
  Loading,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Table)
Vue.use(TimePicker)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
