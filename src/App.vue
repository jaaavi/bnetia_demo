<template>
  <v-app>
    <v-main class="mock-shell">
      <header class="topbar">
        <div class="brand">
          <v-avatar size="42" rounded="circle">
            <img src="/logo.png" alt="BNETIA" />
          </v-avatar>
          <div>
            <strong>BNETIA</strong>
            <span>Demo operativa · administrador</span>
          </div>
        </div>

        <div class="topbar-actions">
          <v-chip color="teal" variant="flat">Mock data</v-chip>
          <v-btn color="primary" variant="tonal" prepend-icon="mdi-refresh" @click="resetSandbox">
            Reiniciar datos
          </v-btn>
        </div>
      </header>

      <section class="summary-grid">
        <div v-for="metric in metrics" :key="metric.label" class="metric-card">
          <v-icon :color="metric.color" size="28">{{ metric.icon }}</v-icon>
          <strong>{{ metric.value }}</strong>
          <span>{{ metric.label }}</span>
        </div>
      </section>

      <section class="workspace">
        <v-tabs v-model="activeTab" bg-color="transparent" color="primary" class="tabs">
          <v-tab value="products"><v-icon start>mdi-cart-plus</v-icon>Hacer pedido</v-tab>
          <v-tab value="orders"><v-icon start>mdi-clipboard-list</v-icon>Pedidos</v-tab>
          <v-tab value="admin"><v-icon start>mdi-shield-account</v-icon>Administrar</v-tab>
          <v-tab value="profile"><v-icon start>mdi-account-circle</v-icon>Perfil</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <v-window-item value="products">
            <div class="content-grid order-layout">
              <section class="panel">
                <div class="panel-heading">
                  <div>
                    <span class="eyebrow">Catálogo</span>
                    <h1>Hacer pedido</h1>
                  </div>
                  <div class="toolbar">
                    <v-select v-model="productSort" :items="productSortOptions" density="compact" hide-details label="Orden" variant="outlined" />
                    <v-text-field v-model="productSearch" density="compact" hide-details prepend-inner-icon="mdi-magnify" placeholder="Buscar" variant="outlined" />
                  </div>
                </div>

                <v-table class="data-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Tipo</th>
                      <th>EUR/Kg</th>
                      <th>Cajas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in visibleProducts" :key="product.priceId" :class="{ muted: product.price === 0 }">
                      <td>
                        <strong>{{ product.name }}</strong>
                        <small>{{ product.description }}</small>
                      </td>
                      <td>{{ product.type }}</td>
                      <td>{{ product.price.toFixed(2) }}</td>
                      <td>
                        <v-text-field
                          v-model.number="product.quantity"
                          type="number"
                          min="0"
                          density="compact"
                          hide-details
                          variant="outlined"
                          class="number-field"
                          :disabled="product.price === 0"
                        />
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </section>

              <aside class="panel cart-panel">
                <div class="panel-heading">
                  <div>
                    <span class="eyebrow">Resumen</span>
                    <h2>Pedido actual</h2>
                  </div>
                  <v-chip color="primary" variant="flat">{{ cartQuantity }} cajas</v-chip>
                </div>

                <div v-if="cartItems.length" class="stack">
                  <div v-for="item in cartItems" :key="item.priceId" class="line-item">
                    <div>
                      <strong>{{ item.name }}</strong>
                      <span>{{ item.type }} · {{ item.quantity }} cajas</span>
                    </div>
                    <b>{{ (item.quantity * item.price).toFixed(2) }} EUR</b>
                  </div>
                </div>
                <v-alert v-else type="info" variant="tonal">No hay productos seleccionados.</v-alert>

                <v-divider class="my-4" />
                <div class="totals">
                  <span>Total estimado</span>
                  <strong>{{ cartTotal.toFixed(2) }} EUR</strong>
                </div>

                <v-select v-model="transport" :items="transportOptions" label="Transporte" density="compact" variant="outlined" class="mt-4" />
                <v-text-field v-model.number="weekNumber" type="number" label="Semana" min="1" max="53" density="compact" variant="outlined" />
                <v-btn block color="primary" prepend-icon="mdi-check" :disabled="!cartItems.length" @click="createOrderFromCart">
                  Confirmar pedido
                </v-btn>
              </aside>
            </div>
          </v-window-item>

          <v-window-item value="orders">
            <section class="panel">
              <div class="panel-heading">
                <div>
                  <span class="eyebrow">Historial</span>
                  <h1>Pedidos</h1>
                </div>
                <div class="toolbar">
                  <v-select v-model="statusFilter" :items="statusOptions" density="compact" hide-details label="Estado" variant="outlined" />
                  <v-select v-model="originFilter" :items="originOptions" density="compact" hide-details label="Origen" variant="outlined" />
                  <v-btn color="success" prepend-icon="mdi-file-excel" @click="exportOrders">Exportar</v-btn>
                </div>
              </div>

              <div class="stack">
                <article v-for="order in filteredOrders" :key="order.id" class="order-card">
                  <div class="order-main">
                    <div>
                      <div class="order-title">
                        <h2>Pedido #{{ order.id }} - {{ order.client }}</h2>
                        <v-chip v-if="order.origin === 'WhatsApp'" color="green" size="small" variant="flat">
                          <v-icon start size="16">mdi-whatsapp</v-icon>WhatsApp
                        </v-chip>
                      </div>
                      <p>{{ order.createdAt }} · Semana {{ order.week }} · {{ order.transport }}</p>
                    </div>
                    <v-chip :color="statusColor(order.status)" variant="flat">{{ order.status }}</v-chip>
                  </div>

                  <v-table class="mini-table">
                    <tbody>
                      <tr v-for="item in order.items" :key="item.priceId">
                        <td>{{ item.name }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.quantity }} cajas</td>
                        <td>{{ (item.quantity * item.price).toFixed(2) }} EUR</td>
                      </tr>
                    </tbody>
                  </v-table>

                  <div class="order-actions">
                    <strong>{{ order.total.toFixed(2) }} EUR</strong>
                    <v-btn v-if="order.status === 'Pendiente'" color="warning" variant="tonal" prepend-icon="mdi-pencil" @click="openPriceDialog(order)">
                      Editar precio
                    </v-btn>
                    <v-btn v-if="order.status === 'Pendiente'" color="error" variant="tonal" prepend-icon="mdi-cancel" @click="setOrderStatus(order.id, 'Cancelado')">
                      Cancelar
                    </v-btn>
                  </div>
                </article>
              </div>
            </section>
          </v-window-item>

          <v-window-item value="admin">
            <section class="panel admin-panel">
              <v-tabs v-model="adminTab" color="primary" class="inner-tabs">
                <v-tab value="validate">Validar pedidos</v-tab>
                <v-tab value="products">Productos</v-tab>
                <v-tab value="users">Usuarios</v-tab>
                <v-tab value="phones">Teléfonos</v-tab>
                <v-tab value="whatsapp">WhatsApp bot</v-tab>
              </v-tabs>

              <v-window v-model="adminTab">
                <v-window-item value="validate">
                  <div class="panel-heading mt-4">
                    <div>
                      <span class="eyebrow">Admin</span>
                      <h1>Validar pedidos pendientes</h1>
                    </div>
                    <v-btn color="success" prepend-icon="mdi-file-excel" @click="exportOrders">Exportar semana</v-btn>
                  </div>

                  <div class="stack">
                    <article v-for="order in pendingOrders" :key="order.id" class="order-card">
                      <div class="order-main">
                        <div>
                          <h2>Pedido #{{ order.id }} - {{ order.client }}</h2>
                          <p>{{ order.origin }} · {{ order.items.length }} líneas · {{ order.total.toFixed(2) }} EUR</p>
                        </div>
                        <v-chip color="warning" variant="flat">Pendiente</v-chip>
                      </div>
                      <div class="order-actions">
                        <v-btn color="success" prepend-icon="mdi-check" @click="setOrderStatus(order.id, 'Validado')">Validar</v-btn>
                        <v-btn color="warning" variant="tonal" prepend-icon="mdi-currency-eur" @click="openPriceDialog(order)">Editar precio</v-btn>
                        <v-btn color="error" variant="tonal" prepend-icon="mdi-close" @click="setOrderStatus(order.id, 'Rechazado')">Rechazar</v-btn>
                      </div>
                    </article>
                    <v-alert v-if="!pendingOrders.length" type="success" variant="tonal">No quedan pedidos pendientes.</v-alert>
                  </div>
                </v-window-item>

                <v-window-item value="products">
                  <div class="panel-heading mt-4">
                    <div>
                      <span class="eyebrow">Admin</span>
                      <h1>Gestión de productos</h1>
                    </div>
                    <div class="toolbar">
                      <v-file-input
                        v-model="priceFile"
                        accept=".xlsx,.xls"
                        density="compact"
                        hide-details
                        label="Excel precios"
                        prepend-icon="mdi-file-excel"
                        variant="outlined"
                      />
                      <v-btn color="secondary" prepend-icon="mdi-upload" @click="mockUploadPrices">Actualizar precios</v-btn>
                      <v-btn color="primary" prepend-icon="mdi-plus" @click="openProductDialog()">Añadir producto</v-btn>
                    </div>
                  </div>

                  <v-table class="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="product in products" :key="product.priceId">
                        <td>{{ product.id }}</td>
                        <td>
                          <strong>{{ product.name }}</strong>
                          <small>{{ product.description }}</small>
                        </td>
                        <td>{{ product.type }}</td>
                        <td>{{ product.price.toFixed(2) }} EUR</td>
                        <td>
                          <v-btn icon="mdi-pencil" size="small" color="primary" variant="text" @click="openProductDialog(product)" />
                          <v-btn icon="mdi-delete" size="small" color="error" variant="text" @click="deleteProduct(product.priceId)" />
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-window-item>

                <v-window-item value="users">
                  <div class="panel-heading mt-4">
                    <div>
                      <span class="eyebrow">Admin</span>
                      <h1>Gestión de usuarios</h1>
                    </div>
                    <v-btn color="primary" prepend-icon="mdi-account-plus" @click="openUserDialog()">Añadir usuario</v-btn>
                  </div>

                  <v-table class="data-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="user in users" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td><v-chip :color="user.role === 'admin' ? 'primary' : 'blue-grey'" size="small">{{ user.role }}</v-chip></td>
                        <td>{{ user.phone }}</td>
                        <td>
                          <v-btn icon="mdi-pencil" size="small" color="primary" variant="text" @click="openUserDialog(user)" />
                          <v-btn icon="mdi-lock-reset" size="small" color="warning" variant="text" @click="resetUserPassword(user.id)" />
                          <v-btn icon="mdi-delete" size="small" color="error" variant="text" @click="deleteUser(user.id)" />
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-window-item>

                <v-window-item value="phones">
                  <div class="panel-heading mt-4">
                    <div>
                      <span class="eyebrow">Admin</span>
                      <h1>Teléfonos permitidos</h1>
                    </div>
                  </div>

                  <div class="form-row">
                    <v-text-field v-model="newPhone.number" label="Número" placeholder="+34..." density="compact" variant="outlined" />
                    <v-text-field v-model="newPhone.name" label="Nombre" density="compact" variant="outlined" />
                    <v-btn color="success" prepend-icon="mdi-plus" @click="addPhone">Agregar</v-btn>
                  </div>

                  <v-table class="data-table">
                    <thead>
                      <tr>
                        <th>Número</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="phone in phones" :key="phone.id">
                        <td>{{ phone.number }}</td>
                        <td>{{ phone.name }}</td>
                        <td><v-chip :color="phone.active ? 'success' : 'error'" size="small">{{ phone.active ? 'Activo' : 'Inactivo' }}</v-chip></td>
                        <td>
                          <v-btn size="small" variant="tonal" @click="phone.active = !phone.active">{{ phone.active ? 'Desactivar' : 'Activar' }}</v-btn>
                          <v-btn icon="mdi-delete" size="small" color="error" variant="text" @click="deletePhone(phone.id)" />
                        </td>
                      </tr>
                    </tbody>
                  </v-table>
                </v-window-item>

                <v-window-item value="whatsapp">
                  <div class="content-grid whatsapp-layout mt-4">
                    <section class="phone-panel">
                      <div class="phone-top">
                        <strong>WhatsApp Business</strong>
                        <v-chip :color="whatsappConnected ? 'success' : 'warning'" size="small">{{ whatsappConnected ? 'Conectado' : 'QR pendiente' }}</v-chip>
                      </div>
                      <div class="qr-box">
                        <v-icon size="96">mdi-qrcode</v-icon>
                        <span>QR demo</span>
                      </div>
                      <v-btn block color="success" prepend-icon="mdi-connection" @click="whatsappConnected = !whatsappConnected">
                        {{ whatsappConnected ? 'Detener sesión' : 'Conectar sesión' }}
                      </v-btn>
                    </section>

                    <section>
                      <v-textarea v-model="whatsappMessage" label="Mensaje entrante mock" rows="8" variant="outlined" />
                      <v-btn color="success" prepend-icon="mdi-robot" @click="processWhatsappOrder">Procesar con IA mock</v-btn>
                    </section>
                  </div>
                </v-window-item>
              </v-window>
            </section>
          </v-window-item>

          <v-window-item value="profile">
            <section class="panel profile-panel">
              <span class="eyebrow">Perfil</span>
              <h1>Administrador demo</h1>
              <div class="content-grid profile-grid">
                <v-text-field v-model="profile.name" label="Nombre" variant="outlined" />
                <v-text-field v-model="profile.email" label="Email" variant="outlined" />
                <v-text-field v-model="profile.company" label="Empresa" variant="outlined" />
                <v-text-field v-model="profile.phone" label="Teléfono" variant="outlined" />
              </div>
              <v-btn color="primary" prepend-icon="mdi-content-save" @click="notify('Perfil mock guardado')">Guardar cambios</v-btn>
            </section>
          </v-window-item>
        </v-window>
      </section>

      <v-dialog v-model="productDialog" max-width="520">
        <v-card>
          <v-card-title>{{ editingProduct ? 'Editar producto' : 'Añadir producto' }}</v-card-title>
          <v-card-text class="dialog-grid">
            <v-text-field v-model="productForm.name" label="Nombre" variant="outlined" />
            <v-text-field v-model="productForm.description" label="Descripción" variant="outlined" />
            <v-select v-model="productForm.type" :items="productTypes" label="Tipo" variant="outlined" />
            <v-text-field v-model.number="productForm.price" type="number" label="Precio" suffix="EUR" variant="outlined" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="productDialog = false">Cancelar</v-btn>
            <v-btn color="primary" @click="saveProduct">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="userDialog" max-width="520">
        <v-card>
          <v-card-title>{{ editingUser ? 'Editar usuario' : 'Añadir usuario' }}</v-card-title>
          <v-card-text class="dialog-grid">
            <v-text-field v-model="userForm.name" label="Nombre" variant="outlined" />
            <v-text-field v-model="userForm.email" label="Email" variant="outlined" />
            <v-select v-model="userForm.role" :items="['admin', 'user']" label="Rol" variant="outlined" />
            <v-text-field v-model="userForm.phone" label="Teléfono" variant="outlined" />
            <v-text-field v-if="!editingUser" v-model="userForm.password" label="Contraseña temporal" variant="outlined" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="userDialog = false">Cancelar</v-btn>
            <v-btn color="primary" @click="saveUser">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="priceDialog" max-width="420">
        <v-card>
          <v-card-title>Editar precio final</v-card-title>
          <v-card-text>
            <v-text-field v-model.number="priceForm.total" type="number" label="Total" suffix="EUR" variant="outlined" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn variant="text" @click="priceDialog = false">Cancelar</v-btn>
            <v-btn color="primary" @click="saveOrderPrice">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2600">
        {{ snackbar.text }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import * as XLSX from 'xlsx';

type Product = { id: number; priceId: number; name: string; description: string; type: string; price: number; quantity: number };
type OrderItem = Pick<Product, 'priceId' | 'name' | 'type' | 'price' | 'quantity'>;
type OrderStatus = 'Pendiente' | 'Validado' | 'Enviado' | 'Entregado' | 'Cancelado' | 'Rechazado';
type Order = { id: number; client: string; origin: 'Panel' | 'WhatsApp'; status: OrderStatus; createdAt: string; week: number; transport: string; total: number; items: OrderItem[] };
type User = { id: number; name: string; email: string; role: 'admin' | 'user'; phone: string };
type Phone = { id: number; number: string; name: string; active: boolean };

const seedProducts: Product[] = [
  { id: 1, priceId: 101, name: 'Solomillo +2,4', description: 'Corte premium de vaca', type: 'COW/VACA', price: 14.8, quantity: 0 },
  { id: 2, priceId: 102, name: 'Solomillo +2', description: 'Caja estándar', type: 'YB/ANOJO', price: 13.6, quantity: 0 },
  { id: 3, priceId: 103, name: 'Morcillo', description: 'Preparado para mayorista', type: 'YB/ANOJO', price: 8.35, quantity: 0 },
  { id: 4, priceId: 104, name: 'Carne picada especial', description: 'Formato hostelería', type: 'COW/VACA', price: 6.9, quantity: 0 },
  { id: 5, priceId: 105, name: 'Lomo bajo', description: 'Pieza limpia en caja', type: 'COW/VACA', price: 11.4, quantity: 0 },
  { id: 6, priceId: 106, name: 'Tapa', description: 'Corte magro', type: 'YB/ANOJO', price: 9.2, quantity: 0 },
  { id: 7, priceId: 107, name: 'Aguja', description: 'Caja calibrada', type: 'COW/VACA', price: 7.75, quantity: 0 },
  { id: 8, priceId: 108, name: 'Carrillera', description: 'Caja hostelería', type: 'COW/VACA', price: 10.1, quantity: 0 },
];

const seedOrders: Order[] = [
  { id: 1840, client: 'Carnicería La Plaza', origin: 'WhatsApp', status: 'Pendiente', createdAt: '16 junio 2026', week: 25, transport: 'Camión refrigerado', total: 677.1, items: [
    { priceId: 101, name: 'Solomillo +2,4', type: 'COW/VACA', price: 14.8, quantity: 30 },
    { priceId: 103, name: 'Morcillo', type: 'YB/ANOJO', price: 8.35, quantity: 18 },
    { priceId: 104, name: 'Carne picada especial', type: 'COW/VACA', price: 6.9, quantity: 12 },
  ] },
  { id: 1839, client: 'Restaurante El Mercado', origin: 'Panel', status: 'Entregado', createdAt: '12 junio 2026', week: 24, transport: 'Ruta semanal centro', total: 641.2, items: [
    { priceId: 105, name: 'Lomo bajo', type: 'COW/VACA', price: 11.4, quantity: 42 },
    { priceId: 106, name: 'Tapa', type: 'YB/ANOJO', price: 9.2, quantity: 18 },
  ] },
];

const products = reactive<Product[]>(structuredClone(seedProducts));
const orders = reactive<Order[]>(structuredClone(seedOrders));
const users = reactive<User[]>([
  { id: 1, name: 'Admin Demo', email: 'admin@demo.local', role: 'admin', phone: '+34600111222' },
  { id: 2, name: 'Carnicería La Plaza', email: 'plaza@demo.local', role: 'user', phone: '+34600111203' },
  { id: 3, name: 'Restaurante El Mercado', email: 'mercado@demo.local', role: 'user', phone: '+34600777888' },
]);
const phones = reactive<Phone[]>([
  { id: 1, number: '+34600111203', name: 'Carnicería La Plaza', active: true },
  { id: 2, number: '+34600777888', name: 'Restaurante El Mercado', active: true },
  { id: 3, number: '+34600999000', name: 'Proveedor demo', active: false },
]);

const activeTab = ref('products');
const adminTab = ref('validate');
const productSearch = ref('');
const productSort = ref('name-asc');
const statusFilter = ref('Todos');
const originFilter = ref('Todos');
const transport = ref('Camión refrigerado');
const weekNumber = ref(26);
const priceFile = ref<File | File[] | null>(null);
const whatsappConnected = ref(false);
const whatsappMessage = ref('Buenos días, semana 26: 30 cajas solomillo +2,4 vaca, 18 cajas morcillo anojo y 12 cajas carne picada especial vaca. Transporte en camión.');
const snackbar = ref({ show: false, text: '', color: 'success' });

const productDialog = ref(false);
const userDialog = ref(false);
const priceDialog = ref(false);
const editingProduct = ref<Product | null>(null);
const editingUser = ref<User | null>(null);
const editingOrder = ref<Order | null>(null);
const productForm = reactive({ name: '', description: '', type: 'COW/VACA', price: 0 });
const userForm = reactive({ name: '', email: '', role: 'user' as 'admin' | 'user', phone: '', password: '' });
const priceForm = reactive({ total: 0 });
const newPhone = reactive({ number: '', name: '' });
const profile = reactive({ name: 'Admin Demo', email: 'admin@demo.local', company: 'BNETIA Demo', phone: '+34600111222' });

const transportOptions = ['Camión refrigerado', 'Recogida en almacén', 'Ruta semanal norte', 'Ruta semanal centro'];
const productSortOptions = [
  { title: 'Nombre A-Z', value: 'name-asc' },
  { title: 'Nombre Z-A', value: 'name-desc' },
  { title: 'Precio menor', value: 'price-asc' },
  { title: 'Precio mayor', value: 'price-desc' },
];
const statusOptions = ['Todos', 'Pendiente', 'Validado', 'Enviado', 'Entregado', 'Cancelado', 'Rechazado'];
const originOptions = ['Todos', 'WhatsApp', 'Panel'];
const productTypes = ['COW/VACA', 'YB/ANOJO'];

const visibleProducts = computed(() => {
  const term = productSearch.value.trim().toLowerCase();
  const list = term
    ? products.filter((product) => [product.name, product.description, product.type].some((value) => value.toLowerCase().includes(term)))
    : [...products];

  return list.sort((a, b) => {
    if (productSort.value === 'name-desc') return b.name.localeCompare(a.name);
    if (productSort.value === 'price-asc') return a.price - b.price;
    if (productSort.value === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
});

const cartItems = computed<OrderItem[]>(() => products.filter((product) => product.quantity > 0).map(({ priceId, name, type, price, quantity }) => ({ priceId, name, type, price, quantity })));
const cartQuantity = computed(() => cartItems.value.reduce((sum, item) => sum + Number(item.quantity), 0));
const cartTotal = computed(() => cartItems.value.reduce((sum, item) => sum + Number(item.quantity) * item.price, 0));
const pendingOrders = computed(() => orders.filter((order) => order.status === 'Pendiente'));
const filteredOrders = computed(() => orders.filter((order) => {
  const statusOk = statusFilter.value === 'Todos' || order.status === statusFilter.value;
  const originOk = originFilter.value === 'Todos' || order.origin === originFilter.value;
  return statusOk && originOk;
}));
const metrics = computed(() => [
  { label: 'productos', value: products.length, icon: 'mdi-package-variant', color: '#2563eb' },
  { label: 'pedidos pendientes', value: pendingOrders.value.length, icon: 'mdi-timer-sand', color: '#ca8a04' },
  { label: 'usuarios', value: users.length, icon: 'mdi-account-group', color: '#7c3aed' },
  { label: 'facturación demo', value: `${orders.reduce((sum, order) => sum + order.total, 0).toFixed(0)} EUR`, icon: 'mdi-cash-multiple', color: '#16a34a' },
]);

onMounted(async () => {
  try {
    const response = await fetch('/api/demo/bootstrap');
    if (!response.ok) return;
    const payload = await response.json();
    if (payload?.success && payload.data) {
      hydrateFromApi(payload.data);
    }
  } catch {
    // En desarrollo con Vite puro no hay serverless API; se usan los seeds locales.
  }
});

function hydrateFromApi(data: any) {
  if (Array.isArray(data.products)) {
    products.splice(0, products.length, ...data.products.map((product: any) => ({
      id: product.id,
      priceId: product.priceId,
      name: product.name,
      description: product.description,
      type: product.type,
      price: Number(product.price || 0),
      quantity: 0,
    })));
  }

  if (Array.isArray(data.orders)) {
    orders.splice(0, orders.length, ...data.orders.map((order: any) => ({
      id: order.id,
      client: order.user_name,
      origin: order.origin,
      status: order.status,
      createdAt: formatDemoDate(order.created_at),
      week: order.week_number,
      transport: order.transport_medium,
      total: Number(order.total_price || 0),
      items: (order.items || []).map((item: any) => ({
        priceId: item.product_price_id,
        name: item.product_name,
        type: item.price_type,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 0),
      })),
    })));
  }

  if (Array.isArray(data.users)) {
    users.splice(0, users.length, ...data.users);
  }

  if (Array.isArray(data.phones)) {
    phones.splice(0, phones.length, ...data.phones.map((phone: any) => ({
      id: phone.id,
      number: phone.phone_number,
      name: phone.phone_name,
      active: phone.is_active,
    })));
  }

  whatsappConnected.value = Boolean(data.whatsapp?.connected);
}

function formatDemoDate(value: string) {
  return new Date(value).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function notify(text: string, color = 'success') {
  snackbar.value = { show: true, text, color };
}

function createOrderFromCart() {
  orders.unshift({
    id: nextId(orders),
    client: 'Cliente demo',
    origin: 'Panel',
    status: 'Pendiente',
    createdAt: '16 junio 2026',
    week: weekNumber.value,
    transport: transport.value,
    total: cartTotal.value,
    items: structuredClone(cartItems.value),
  });
  products.forEach((product) => { product.quantity = 0; });
  activeTab.value = 'orders';
  notify('Pedido creado con datos ficticios');
}

function setOrderStatus(orderId: number, status: OrderStatus) {
  const order = orders.find((item) => item.id === orderId);
  if (!order) return;
  order.status = status;
  notify(`Pedido #${orderId} actualizado a ${status}`, status === 'Cancelado' || status === 'Rechazado' ? 'warning' : 'success');
}

function openPriceDialog(order: Order) {
  editingOrder.value = order;
  priceForm.total = order.total;
  priceDialog.value = true;
}

function saveOrderPrice() {
  if (!editingOrder.value) return;
  editingOrder.value.total = Number(priceForm.total || 0);
  priceDialog.value = false;
  notify('Precio final actualizado');
}

function openProductDialog(product?: Product) {
  editingProduct.value = product || null;
  productForm.name = product?.name || '';
  productForm.description = product?.description || '';
  productForm.type = product?.type || 'COW/VACA';
  productForm.price = product?.price || 0;
  productDialog.value = true;
}

function saveProduct() {
  if (!productForm.name.trim()) return notify('El nombre del producto es obligatorio', 'error');
  if (editingProduct.value) {
    Object.assign(editingProduct.value, productForm);
  } else {
    const id = nextId(products);
    products.push({ id, priceId: 100 + id, quantity: 0, ...structuredClone(productForm) });
  }
  productDialog.value = false;
  notify('Producto guardado');
}

function deleteProduct(priceId: number) {
  const index = products.findIndex((product) => product.priceId === priceId);
  if (index >= 0) products.splice(index, 1);
  notify('Producto eliminado', 'warning');
}

function mockUploadPrices() {
  products.forEach((product, index) => {
    product.price = Number((product.price * (1 + ((index % 3) - 1) * 0.025)).toFixed(2));
  });
  const fileName = Array.isArray(priceFile.value) ? priceFile.value[0]?.name : priceFile.value?.name;
  notify(fileName ? `Precios actualizados desde ${fileName}` : 'Precios actualizados con Excel demo');
}

function openUserDialog(user?: User) {
  editingUser.value = user || null;
  userForm.name = user?.name || '';
  userForm.email = user?.email || '';
  userForm.role = user?.role || 'user';
  userForm.phone = user?.phone || '';
  userForm.password = '';
  userDialog.value = true;
}

function saveUser() {
  if (!userForm.name.trim() || !userForm.email.trim()) return notify('Nombre y email son obligatorios', 'error');
  if (editingUser.value) {
    Object.assign(editingUser.value, { name: userForm.name, email: userForm.email, role: userForm.role, phone: userForm.phone });
  } else {
    users.push({ id: nextId(users), name: userForm.name, email: userForm.email, role: userForm.role, phone: userForm.phone });
  }
  userDialog.value = false;
  notify('Usuario guardado');
}

function deleteUser(id: number) {
  const index = users.findIndex((user) => user.id === id);
  if (index >= 0) users.splice(index, 1);
  notify('Usuario eliminado', 'warning');
}

function resetUserPassword(id: number) {
  const user = users.find((item) => item.id === id);
  notify(`Contraseña temporal generada para ${user?.name || `usuario ${id}`}`);
}

function addPhone() {
  if (!newPhone.number.startsWith('+')) return notify('El teléfono debe incluir prefijo internacional', 'error');
  phones.push({ id: nextId(phones), number: newPhone.number, name: newPhone.name || 'Sin nombre', active: true });
  newPhone.number = '';
  newPhone.name = '';
  notify('Teléfono permitido agregado');
}

function deletePhone(id: number) {
  const index = phones.findIndex((phone) => phone.id === id);
  if (index >= 0) phones.splice(index, 1);
  notify('Teléfono eliminado', 'warning');
}

function processWhatsappOrder() {
  const lines = [
    { priceId: 101, name: 'Solomillo +2,4', type: 'COW/VACA', price: findPrice(101), quantity: 30 },
    { priceId: 103, name: 'Morcillo', type: 'YB/ANOJO', price: findPrice(103), quantity: 18 },
    { priceId: 104, name: 'Carne picada especial', type: 'COW/VACA', price: findPrice(104), quantity: 12 },
  ];
  orders.unshift({
    id: nextId(orders),
    client: 'Cliente WhatsApp demo',
    origin: 'WhatsApp',
    status: 'Pendiente',
    createdAt: '16 junio 2026',
    week: 26,
    transport: whatsappMessage.value.toLowerCase().includes('recogida') ? 'Recogida en almacén' : 'Camión refrigerado',
    total: lines.reduce((sum, item) => sum + item.price * item.quantity, 0),
    items: lines,
  });
  adminTab.value = 'validate';
  activeTab.value = 'admin';
  notify('Mensaje WhatsApp procesado y pendiente de validación');
}

function exportOrders() {
  const rows = orders.flatMap((order) => order.items.map((item) => ({
    Pedido: order.id,
    Cliente: order.client,
    Origen: order.origin,
    Estado: order.status,
    Semana: order.week,
    Transporte: order.transport,
    Producto: item.name,
    Tipo: item.type,
    Cajas: item.quantity,
    Precio: item.price,
    TotalLinea: Number((item.quantity * item.price).toFixed(2)),
    TotalPedido: order.total,
  })));
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos demo');
  XLSX.writeFile(workbook, 'pedidos-demo-bnetia.xlsx');
  notify('Excel de pedidos generado');
}

function resetSandbox() {
  products.splice(0, products.length, ...structuredClone(seedProducts));
  orders.splice(0, orders.length, ...structuredClone(seedOrders));
  activeTab.value = 'products';
  adminTab.value = 'validate';
  whatsappConnected.value = false;
  notify('Datos ficticios reiniciados');
}

function statusColor(status: OrderStatus) {
  return ({ Pendiente: 'warning', Validado: 'success', Enviado: 'info', Entregado: 'primary', Cancelado: 'error', Rechazado: 'error' } as Record<OrderStatus, string>)[status];
}

function findPrice(priceId: number) {
  return products.find((product) => product.priceId === priceId)?.price || 0;
}

function nextId(items: Array<{ id: number }>) {
  return Math.max(0, ...items.map((item) => item.id)) + 1;
}
</script>

<style scoped>
.mock-shell {
  min-height: 100vh;
  width: 100%;
  background: #eef2f6;
  color: #102331;
  padding: 22px;
}

.topbar,
.workspace,
.panel,
.metric-card,
.order-card,
.phone-panel {
  border: 1px solid #d8e0e8;
  border-radius: 8px;
  background: #ffffff;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1240px;
  margin: 0 auto 16px;
  padding: 14px 18px;
}

.brand,
.topbar-actions,
.panel-heading,
.toolbar,
.order-main,
.order-title,
.order-actions,
.line-item,
.totals,
.form-row,
.phone-top {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand span,
.metric-card span,
.eyebrow,
.line-item span {
  display: block;
  color: #64748b;
  font-size: 13px;
}

.topbar-actions,
.panel-heading,
.order-main,
.order-actions,
.line-item,
.totals,
.phone-top {
  justify-content: space-between;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  max-width: 1240px;
  margin: 0 auto 16px;
}

.metric-card {
  min-height: 112px;
  padding: 16px;
}

.metric-card strong {
  display: block;
  margin-top: 12px;
  font-size: 25px;
}

.workspace {
  max-width: 1240px;
  margin: 0 auto;
  padding: 12px;
}

.tabs,
.inner-tabs {
  border-bottom: 1px solid #d8e0e8;
  margin-bottom: 18px;
}

.content-grid {
  display: grid;
  gap: 16px;
}

.order-layout {
  grid-template-columns: minmax(0, 1fr) 340px;
}

.whatsapp-layout,
.profile-grid {
  grid-template-columns: 340px minmax(0, 1fr);
}

.panel,
.phone-panel {
  padding: 18px;
}

.admin-panel {
  min-height: 620px;
}

.panel-heading {
  margin-bottom: 16px;
}

h1,
h2 {
  margin: 0;
  color: #102331;
  letter-spacing: 0;
}

h1 {
  font-size: 26px;
}

h2 {
  font-size: 18px;
}

.toolbar > * {
  min-width: 190px;
}

.data-table,
.mini-table {
  border: 1px solid #d8e0e8;
  border-radius: 8px;
  overflow: hidden;
}

.data-table small {
  display: block;
  color: #64748b;
}

.number-field {
  max-width: 120px;
}

.cart-panel {
  align-self: start;
}

.stack,
.dialog-grid {
  display: grid;
  gap: 12px;
}

.line-item {
  border-bottom: 1px solid #e7edf3;
  padding-bottom: 10px;
}

.totals strong {
  font-size: 22px;
}

.order-card {
  padding: 16px;
}

.order-main {
  align-items: flex-start;
}

.order-main p {
  margin: 4px 0 0;
  color: #64748b;
}

.order-actions {
  margin-top: 12px;
}

.form-row {
  align-items: flex-start;
  margin-bottom: 16px;
}

.form-row > * {
  flex: 1;
}

.phone-panel {
  background: #17212b;
  color: #f8fafc;
}

.qr-box {
  display: grid;
  place-items: center;
  min-height: 220px;
  margin: 16px 0;
  border: 1px dashed rgba(255, 255, 255, 0.28);
  border-radius: 8px;
  color: #d1d5db;
}

.muted {
  opacity: 0.55;
}

.profile-panel {
  max-width: 900px;
}

@media (max-width: 980px) {
  .summary-grid,
  .order-layout,
  .whatsapp-layout,
  .profile-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .topbar,
  .panel-heading,
  .toolbar,
  .order-main,
  .topbar-actions,
  .form-row {
    align-items: stretch;
    flex-direction: column;
  }

  .toolbar > * {
    min-width: 0;
  }
}

@media (max-width: 620px) {
  .mock-shell {
    padding: 12px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
