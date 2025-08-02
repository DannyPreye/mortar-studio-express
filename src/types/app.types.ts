
export type StaticRoute = {
    path: string;
    template: string;
    title: string;
    keywords?: string[];
    description?: string;
    metadata?: Record<string, any>;
    layout?: string;
}
