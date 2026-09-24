import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer, collection, addDoc, getDocs, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Use the dedicated database ID provided in config
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Validate connection per skill instructions
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline:', error.message);
    }
  }
}

// Order interface for the database
export interface OrderItem {
  productId: string;
  productNameFr: string;
  productNameAr: string;
  quantity: number;
  weightOrUnit: string;
}

export interface CustomerOrder {
  id?: string;
  customerName: string;
  phone: string;
  city: string;
  address?: string;
  deliveryMethod: 'delivery' | 'pickup';
  items: OrderItem[];
  notes?: string;
  status: 'new' | 'confirmed' | 'preparing' | 'delivered' | 'cancelled';
  createdAt: string;
}

// Function to save order to Firestore
export async function saveCustomerOrder(orderData: Omit<CustomerOrder, 'id'>): Promise<string> {
  const ordersCollection = collection(db, 'orders');
  const docRef = await addDoc(ordersCollection, orderData);
  return docRef.id;
}

// Function to subscribe to real-time orders for artisan dashboard
export function subscribeToOrders(callback: (orders: CustomerOrder[]) => void) {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const orders: CustomerOrder[] = [];
    snapshot.forEach((docSnap) => {
      orders.push({
        id: docSnap.id,
        ...(docSnap.data() as Omit<CustomerOrder, 'id'>),
      });
    });
    callback(orders);
  }, (error) => {
    console.error('Error fetching orders:', error);
  });
}

// Function to update order status
export async function updateOrderStatus(orderId: string, status: CustomerOrder['status']) {
  const orderDocRef = doc(db, 'orders', orderId);
  await updateDoc(orderDocRef, { status });
}
