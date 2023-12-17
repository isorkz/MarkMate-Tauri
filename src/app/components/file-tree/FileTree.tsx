"use client"

import React, { ChangeEvent, Component } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import fs from 'fs';
import path from 'path';

interface NodeProps {
  path: string;
  name: string;
  toggled?: boolean;
  active?: boolean;
  children?: NodeProps[];
}

interface FileTreeProps {
  tree: NodeProps;
  onFileSelect: (filePath: string) => void;
  onTreeRefresh: () => void;
}

interface FileTreeState {
  tree: NodeProps;
  newNodeName: string;
  renamingNode: NodeProps | null;
  cursor: NodeProps | null;
}

class FileTree extends Component<FileTreeProps, FileTreeState> {
  constructor(props: FileTreeProps) {
    super(props);
    this.state = {
      tree: props.tree,
      newNodeName: '',
      renamingNode: null,
      cursor: null,
    };
  }

  onToggle = (node: NodeProps, toggled: boolean) => {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
    this.props.onFileSelect(node.path);
  }

  onNewFile = () => {
    const newPath = path.join(this.state.cursor?.path || '', this.state.newNodeName);
    fs.writeFileSync(newPath, '');
    this.setState({ newNodeName: '' });
    this.props.onTreeRefresh();
  }

  onRename = () => {
    const oldPath = this.state.renamingNode?.path || '';
    const newPath = path.join(path.dirname(oldPath), this.state.newNodeName);
    fs.renameSync(oldPath, newPath);
    this.setState({ newNodeName: '', renamingNode: null });
    this.props.onTreeRefresh();
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ newNodeName: event.target.value });
  }

  render() {
    decorators.Header = (props: any) => {
      const style = props.style;
      const iconType = props.node.children ? 'folder' : 'file-text';
      const iconClass = `fa fa-${iconType}`;
      const iconStyle = { marginRight: '5px' };

      return (
        <div style={style.base}>
          <div style={style.title}>
            <i className={iconClass} style={iconStyle} />
            {props.node.name}
          </div>
        </div>
      );
    };

    return (
      <div>
        <Treebeard
          data={this.state.tree}
          onToggle={this.onToggle}
          decorators={decorators}
        />
        <input type="text" value={this.state.newNodeName} onChange={this.handleChange} />
        <button onClick={this.onNewFile}>New File</button>
        <button onClick={this.onRename}>Rename</button>
      </div>
    );
  }
}

export default FileTree;