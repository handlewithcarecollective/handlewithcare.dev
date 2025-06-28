"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return <p>Nice, you broke it! Keep reading to see what went wrong</p>;
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
