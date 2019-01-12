export abstract class Trie<T> {
  abstract addWord(word: T): Trie<T>;
  abstract deleteWord(word: T): Trie<T>;
  abstract suggestNextCharacters(word: T): T[];
  abstract doesWordExist(word: T): boolean;
  abstract getLastCharacterNode(word: T): TrieNode<T>;
}
export abstract class TrieNode<T> {
  abstract getChild(character: T): TrieNode<T>;
  abstract addChild(character: T, isCompleteWord: boolean): TrieNode<T>;
  abstract removeChild(character: T): TrieNode<T>;
  abstract hasChild(character: T): boolean;
  abstract hasChildren(): boolean;
  abstract suggestChildren(): string[];
  abstract toString(): string;
}
