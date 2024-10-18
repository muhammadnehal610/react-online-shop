import React, { useEffect, useState } from "react";
import { Table, message, Spin, Card, Typography, Avatar } from "antd";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../utils/firebase"; // Ensure these imports are correct
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Purches() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Add user state

  const fetchPurchases = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        message.error("No user logged in.");
        return;
      }

      // Set user info
      setUser(currentUser);

      const purchasesQuery = query(
        collection(db, "purchases"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(purchasesQuery);

      if (querySnapshot.empty) {
        message.info("No purchases found for this user.");
        setPurchases([]); // Clear the purchases if none found
      } else {
        const purchaseData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            key: doc.id,
            createdAt: data.createdAt,
            items: data.items.map((item) => ({
              id: item.id,
              image: item.image,
              price: parseFloat(item.price),
              quantity: item.quantity,
              title: item.title,
            })),
            totalAmount: parseFloat(data.totalAmount),
            totalQuantity: data.totalQuantity,
          };
        });

        setPurchases(purchaseData);
      }
    } catch (error) {
      message.error("Error fetching purchases: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const columns = [
    {
      title: "Purchase Date",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Total Quantity",
      dataIndex: "totalQuantity",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Items",
      dataIndex: "items",
      render: (items) => (
        <ul style={{ paddingLeft: "20px" }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 50, marginRight: 8, borderRadius: 4 }}
              />
              <span>
                {item.title} (x{item.quantity}) - ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Your Purchases</Title>
      {user && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar
            src={
              user.photoURL || <UserOutlined className="text-black text-xl" />
            }
            size={64}
            style={{ marginRight: "10px" }}
          />
          <Title level={4} style={{ margin: 0 }}>
            {user.displayName || "Admin"}
          </Title>
        </div>
      )}
      {loading ? (
        <Spin tip="Loading purchases..." />
      ) : (
        <Card style={{ marginTop: "20px" }}>
          <Table
            columns={columns}
            dataSource={purchases}
            pagination={{ pageSize: 5 }}
            rowClassName="purchase-row"
          />
        </Card>
      )}
    </div>
  );
}

export default Purches;
