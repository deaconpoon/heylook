export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  created_at: Date;
  last_active_at: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  target_url: string;
  figma_file_url?: string;
  is_archived: boolean;
}

export interface Session {
  id: string;
  project_id: string;
  started_by: string;
  started_at: Date;
  ended_at?: Date;
  session_data: {
    viewport_size?: {
      width: number;
      height: number;
    };
    active_tool?: string;
    comparison_mode?: 'side-by-side' | 'overlay';
  };
}

export interface Annotation {
  id: string;
  session_id: string;
  created_by: string;
  created_at: Date;
  position_data: {
    x: number;
    y: number;
    width?: number;
    height?: number;
  };
  target_element_selector?: string;
  annotation_type: 'highlight' | 'note' | 'drawing' | 'measurement';
  content: Record<string, unknown>;
  resolved: boolean;
  resolved_by?: string;
  resolved_at?: Date;
}

export interface IssueReport {
  id: string;
  session_id: string;
  reported_by: string;
  created_at: Date;
  title: string;
  description: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'in-progress' | 'resolved';
  associated_annotations: string[];
  metadata: {
    browser?: string;
    viewport?: string;
    os?: string;
  };
} 