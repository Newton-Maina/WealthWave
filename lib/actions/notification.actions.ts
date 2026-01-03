"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { parseStringify } from "@/lib/utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_NOTIFICATION_COLLECTION_ID: NOTIFICATION_COLLECTION_ID,
} = process.env;

export const createNotification = async (notification: CreateNotificationParams) => {
  try {
    const { database } = await createAdminClient();

    const newNotification = await database.createDocument(
      DATABASE_ID!,
      NOTIFICATION_COLLECTION_ID!,
      ID.unique(),
      {
        ...notification,
        isRead: false,
        createdAt: new Date().toISOString(),
      }
    );

    return parseStringify(newNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
  }
};

export const getNotifications = async (userId: string) => {
  try {
    const { database } = await createAdminClient();

    const notifications = await database.listDocuments(
      DATABASE_ID!,
      NOTIFICATION_COLLECTION_ID!,
      [
        Query.equal("userId", [userId]),
        Query.orderDesc("createdAt"),
        Query.limit(10),
      ]
    );

    return parseStringify(notifications.documents);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const { database } = await createAdminClient();

        const updatedNotification = await database.updateDocument(
            DATABASE_ID!,
            NOTIFICATION_COLLECTION_ID!,
            notificationId,
            {
                isRead: true,
            }
        );

        return parseStringify(updatedNotification);
    } catch (error) {
        console.error("Error marking notification as read:", error);
    }
}
