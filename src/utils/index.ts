import { db } from "@/db"
import { cache } from "./cache";

export const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  });
  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  }
}

export const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true }
    })
  ]);
  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
  }
}

export const getProductData = async () => {
  const [activeCount, inActiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } })
  ]);
  return {
    activeCount,
    inActiveCount,
  }
}

export const getProducts = async () => {
  return await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      isAvailableForPurchase: true,
      filePath: true,
      _count: { select: { orders: true } }
    },
    orderBy: { name: "asc" }
  })
}

export const getMostPopularProducts = cache(() => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true
    },
    orderBy: {
      orders: {
        _count: "desc"
      }
    },
    take: 6
  });
}, ['/', "getMostPopularProducts"], { revalidate: 60 * 60 * 24 });

export const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 6
  });
}, ['/', "getNewestProducts"]);

export const getProductsForUser = cache(() => {
  return db.product.findMany({
    where: {
      isAvailableForPurchase: true
    },
    orderBy: {
      name: "asc"
    }
  });
},['/products', "getProductsForUser"]);

export const getProduct = async (id: string) => {
  return await db.product.findUnique({
    where: { id }
  });
}