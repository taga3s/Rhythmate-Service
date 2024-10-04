/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

/** WithRequired type helpers */
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface paths {
  "/users/auth": {
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["AuthRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["AuthResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/users/authenticated": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GetLoginUserResponse"];
          };
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/users/logout": {
    post: {
      responses: {
        /** @description 成功 */
        200: {
          content: never;
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/users/me": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GetLoginUserResponse"];
          };
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    delete: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["DeleteUserResponse"];
          };
        };
        /** @description 認証エラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateLoginUserRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GetLoginUserResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        404: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListQuestsResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["CreateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/:id": {
    delete: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["DeleteQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["DeleteQuestResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/start/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/finish/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/quests/force-finish/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateQuestRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateQuestResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/tags": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListTagsResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["CreateTagRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["CreateTagResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/tags/:id": {
    delete: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["DeleteTagRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["DeleteTagResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateTagRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UpdateTagResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/weekly-reports": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListWeeklyReportsResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/weekly-reports/feedback/:weeklyReportId": {
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["GenerateWeeklyReportFeedBackRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["GenerateWeeklyReportFeedBackResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges": {
    get: {
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ListBadgeResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["AchieveBadgeRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["AchieveBadgeResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges/pin/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["PinBadgeRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["PinBadgeResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
  "/badges/unpin/:id": {
    patch: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["UnpinBadgeRequest"];
        };
      };
      responses: {
        /** @description 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["UnpinBadgeResponse"];
          };
        };
        /** @description クライアントエラー */
        400: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description 認証エラー */
        401: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
        /** @description サーバーエラー */
        500: {
          content: {
            "application/json": components["schemas"]["ErrorResponse"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    ErrorResponse: {
      /** @example error */
      status: string;
      /** @example errorMsg */
      message: string;
    };
    AuthRequest: {
      id_token: string;
    };
    UpdateLoginUserRequest: {
      name: string;
      image_src: string;
    };
    AuthResponse: {
      rtoken: string;
      status: string;
    };
    GetLoginUserResponse: {
      status: string;
      name: string;
      email: string;
      exp: number;
      level: number;
      imageUrl: string;
    };
    DeleteUserResponse: {
      status: string;
    };
    CreateQuestRequest: {
      title: string;
      description: string;
      starts_at: string;
      minutes: number;
      tag_id: string;
      /** @enum {string} */
      difficulty: "EASY" | "NORMAL" | "HARD";
      days: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
      /** @enum {string} */
      state: "INACTIVE" | "ACTIVE";
    };
    UpdateQuestRequest: {
      id?: string;
      title: string;
      description: string;
      starts_at: string;
      minutes: number;
      tag_id: string;
      /** @enum {string} */
      difficulty: "EASY" | "NORMAL" | "HARD";
      days: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
    };
    DeleteQuestRequest: {
      id: string;
    };
    QuestBaseResponse: {
      id: string;
      title: string;
      description: string;
      starts_at: string;
      started_at: string;
      minutes: number;
      tag_id: string;
      /** @enum {string} */
      difficulty: "EASY" | "NORMAL" | "HARD";
      /** @enum {string} */
      state: "INACTIVE" | "ACTIVE";
      is_succeeded: boolean;
      days: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
      continuation_level: number;
      weekly_frequency: number;
      weekly_completion_count: number;
      total_completion_count: number;
    };
    CreateQuestResponse: WithRequired<
      components["schemas"]["QuestBaseResponse"] & {
        status?: string;
      },
      | "id"
      | "title"
      | "description"
      | "starts_at"
      | "started_at"
      | "minutes"
      | "tag_id"
      | "difficulty"
      | "state"
      | "is_succeeded"
      | "days"
      | "continuation_level"
      | "weekly_frequency"
      | "weekly_completion_count"
      | "total_completion_count"
    >;
    UpdateQuestResponse: WithRequired<
      components["schemas"]["QuestBaseResponse"] & {
        status?: string;
      },
      | "id"
      | "title"
      | "description"
      | "starts_at"
      | "started_at"
      | "minutes"
      | "tag_id"
      | "difficulty"
      | "state"
      | "is_succeeded"
      | "days"
      | "continuation_level"
      | "weekly_frequency"
      | "weekly_completion_count"
      | "total_completion_count"
    >;
    DeleteQuestResponse: {
      status: string;
    };
    ListQuestsResponse: {
      status: string;
      quests: components["schemas"]["QuestBaseResponse"][];
    };
    CreateTagRequest: {
      /** @example TechStudy */
      name: string;
      /** @example Blue */
      color: string;
    };
    UpdateTagRequest: {
      id: string;
      /** @example TechStudy */
      name: string;
      /** @example Blue */
      color: string;
    };
    DeleteTagRequest: {
      id: string;
    };
    TagsBaseResponse: {
      id: string;
      name: string;
      color: string;
    };
    CreateTagResponse: components["schemas"]["TagsBaseResponse"] & {
      status: string;
    };
    UpdateTagResponse: components["schemas"]["TagsBaseResponse"] & {
      status: string;
    };
    ListTagsResponse: {
      status: string;
      tags: components["schemas"]["TagsBaseResponse"][];
    };
    DeleteTagResponse: {
      /** @example ok */
      status: string;
    };
    GenerateWeeklyReportFeedBackRequest: {
      weeklyReportId: string;
    };
    ListWeeklyReportsResponse: {
      status: string;
      weeklyReports: {
        id: string;
        completed_quests: number;
        failed_quests: number;
        completed_percentage: number;
        streak_days: number;
        completed_quests_each_day: number[];
        failed_quests_each_day: number[];
        feedback: string;
        start_date: string;
        end_date: string;
        user_id: string;
      }[];
    };
    GenerateWeeklyReportFeedBackResponse: {
      status: string;
      feedBack: string;
    };
    BadgeBaseResponse: {
      badge_id: string;
      name: string;
      description: string;
      /** @enum {string} */
      image_type: "bow" | "cat" | "crown" | "gem" | "horse" | "shield" | "sword";
      /** @enum {string} */
      frame_color: "bronze" | "silver" | "gold";
      obtained_at: string;
      is_pinned: boolean;
      unlockable: boolean;
    };
    AchieveBadgeRequest: {
      badge_id: string;
    };
    AchieveBadgeResponse: components["schemas"]["BadgeBaseResponse"] & {
      status: string;
    };
    ListBadgeResponse: {
      status: string;
      badgesWithDetail: components["schemas"]["BadgeBaseResponse"][];
    };
    PinBadgeRequest: {
      badge_id: string;
    };
    PinBadgeResponse: components["schemas"]["BadgeBaseResponse"] & {
      status: string;
    };
    UnpinBadgeRequest: {
      badge_id: string;
    };
    UnpinBadgeResponse: components["schemas"]["BadgeBaseResponse"] & {
      status: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
